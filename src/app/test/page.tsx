'use client';
import { Button, Card, Typography } from 'notion-design-system';
import 'notion-design-system/dist/index.css';

export default function App() {
  return (
    <div>
      <Typography variant="h1">Hello Notion Design System!</Typography>
      <Card>
        <Card variant="elevated" padding="md" hoverable clickable>
          <Typography variant="body1">
            This is a beautiful card component!
          </Typography>
        </Card>
      </Card>
      <Button variant="primary">Get Started</Button>
    </div>
  );
}