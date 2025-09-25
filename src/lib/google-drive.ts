import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  parents?: string[];
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  iconLink?: string;
  shared?: boolean;
  modifiedTime?: string;
  createdTime?: string;
}

export interface TokenData {
  access_token: string;
  refresh_token?: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}

export class GoogleDriveService {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  // Generate OAuth URL for user authorization
  getAuthUrl(): string {
    const scopes = [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  // Exchange authorization code for tokens
  async getTokens(code: string): Promise<TokenData> {
    const { tokens } = await this.oauth2Client.getToken(code);
    return tokens as TokenData;
  }

  // Set credentials for API calls
  setCredentials(tokens: TokenData) {
    this.oauth2Client.setCredentials(tokens);
  }

  // Refresh access token using refresh token
  async refreshAccessToken(refreshToken: string): Promise<TokenData> {
    this.oauth2Client.setCredentials({
      refresh_token: refreshToken
    });
    
    const { credentials } = await this.oauth2Client.refreshAccessToken();
    return credentials as TokenData;
  }

  // Get user profile information
  async getUserProfile() {
    const oauth2 = google.oauth2({ version: 'v2', auth: this.oauth2Client });
    const { data } = await oauth2.userinfo.get();
    return {
      id: data.id!,
      email: data.email!,
      name: data.name || '',
      picture: data.picture || ''
    };
  }

  // List files in Google Drive
  async listFiles(options: {
    pageSize?: number;
    pageToken?: string;
    q?: string;
    folderId?: string;
  } = {}): Promise<{
    files: DriveFile[];
    nextPageToken?: string;
  }> {
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });
    
    let query = options.q || '';
    if (options.folderId) {
      query = query ? `${query} and '${options.folderId}' in parents` : `'${options.folderId}' in parents`;
    }

    const { data } = await drive.files.list({
      pageSize: options.pageSize || 50,
      pageToken: options.pageToken,
      q: query,
      fields: 'nextPageToken, files(id, name, mimeType, size, parents, webViewLink, webContentLink, thumbnailLink, iconLink, shared, modifiedTime, createdTime)',
      orderBy: 'modifiedTime desc'
    });

    return {
      files: data.files as DriveFile[],
      nextPageToken: data.nextPageToken || undefined
    };
  }

  // Get file metadata
  async getFile(fileId: string): Promise<DriveFile> {
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });
    
    const { data } = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, size, parents, webViewLink, webContentLink, thumbnailLink, iconLink, shared, modifiedTime, createdTime'
    });

    return data as DriveFile;
  }

  // Download file content
  async downloadFile(fileId: string): Promise<Buffer> {
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });
    
    const response = await drive.files.get({
      fileId,
      alt: 'media'
    }, { responseType: 'arraybuffer' });

    return Buffer.from(response.data as ArrayBuffer);
  }

  // Export Google Docs/Sheets/Slides as specific format
  async exportFile(fileId: string, mimeType: string): Promise<Buffer> {
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });
    
    const response = await drive.files.export({
      fileId,
      mimeType
    }, { responseType: 'arraybuffer' });

    return Buffer.from(response.data as ArrayBuffer);
  }

  // Create a new file
  async createFile(options: {
    name: string;
    content: Buffer | string;
    mimeType: string;
    parents?: string[];
  }): Promise<DriveFile> {
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });

    const media = {
      mimeType: options.mimeType,
      body: options.content
    };

    const { data } = await drive.files.create({
      requestBody: {
        name: options.name,
        parents: options.parents
      },
      media,
      fields: 'id, name, mimeType, size, parents, webViewLink, webContentLink, thumbnailLink, iconLink, shared, modifiedTime, createdTime'
    });

    return data as DriveFile;
  }

  // Update file content
  async updateFile(fileId: string, options: {
    content?: Buffer | string;
    name?: string;
    mimeType?: string;
  }): Promise<DriveFile> {
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });

    const updateData: any = {};
    if (options.name) updateData.name = options.name;

    const media = options.content ? {
      mimeType: options.mimeType || 'text/plain',
      body: options.content
    } : undefined;

    const { data } = await drive.files.update({
      fileId,
      requestBody: updateData,
      media,
      fields: 'id, name, mimeType, size, parents, webViewLink, webContentLink, thumbnailLink, iconLink, shared, modifiedTime, createdTime'
    });

    return data as DriveFile;
  }

  // Delete a file
  async deleteFile(fileId: string): Promise<void> {
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });
    await drive.files.delete({ fileId });
  }

  // Create a folder
  async createFolder(name: string, parents?: string[]): Promise<DriveFile> {
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });

    const { data } = await drive.files.create({
      requestBody: {
        name,
        mimeType: 'application/vnd.google-apps.folder',
        parents
      },
      fields: 'id, name, mimeType, parents, webViewLink'
    });

    return data as DriveFile;
  }

  // Search files
  async searchFiles(query: string, options: {
    pageSize?: number;
    pageToken?: string;
  } = {}): Promise<{
    files: DriveFile[];
    nextPageToken?: string;
  }> {
    return this.listFiles({
      ...options,
      q: `name contains '${query}' or fullText contains '${query}'`
    });
  }
}