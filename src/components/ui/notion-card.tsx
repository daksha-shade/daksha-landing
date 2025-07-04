import * as React from "react"
import { cn } from "@/lib/utils"

const NotionCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-card text-card-foreground border border-border rounded-lg shadow-sm transition-all duration-200 hover:shadow-md card-hover",
      className
    )}
    {...props}
  />
))
NotionCard.displayName = "NotionCard"

const NotionCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
NotionCardHeader.displayName = "NotionCardHeader"

const NotionCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight font-inter", className)}
    {...props}
  />
))
NotionCardTitle.displayName = "NotionCardTitle"

const NotionCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground font-inter", className)}
    {...props}
  />
))
NotionCardDescription.displayName = "NotionCardDescription"

const NotionCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
NotionCardContent.displayName = "NotionCardContent"

const NotionCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
NotionCardFooter.displayName = "NotionCardFooter"

export { NotionCard, NotionCardHeader, NotionCardFooter, NotionCardTitle, NotionCardDescription, NotionCardContent }