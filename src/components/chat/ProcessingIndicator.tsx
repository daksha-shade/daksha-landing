"use client"

import { 
  Loader, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Bot,
  Brain,
  Database,
  Network,
  Sparkles,
  Zap
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface ProcessingStep {
  id: string
  name: string
  status: 'pending' | 'running' | 'completed' | 'error'
  progress: number
  details?: string
  icon?: any
}

interface ProcessingIndicatorProps {
  steps: ProcessingStep[]
  currentStep?: string
}

const stepIcons = {
  'understanding': Brain,
  'analyzing': Database,
  'connecting': Network,
  'generating': Sparkles,
  'crafting': Zap
}

export default function ProcessingIndicator({ steps, currentStep }: ProcessingIndicatorProps) {
  const overallProgress = steps.length > 0 
    ? (steps.filter(s => s.status === 'completed').length / steps.length) * 100 
    : 0

  return (
    <div className="flex gap-3 mb-6">
      <Avatar className="w-8 h-8 mt-1">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <Bot className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      
      <div className="max-w-[80%] w-full">
        <div className="bg-muted rounded-2xl px-4 py-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Loader className="w-4 h-4 animate-spin text-primary" />
                Processing your request...
              </div>
              <div className="text-xs text-muted-foreground">
                {Math.round(overallProgress)}%
              </div>
            </div>
            
            {/* Overall Progress */}
            <div className="space-y-2">
              <Progress value={overallProgress} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {steps.filter(s => s.status === 'completed').length} of {steps.length} steps completed
              </div>
            </div>
            
            {/* Processing Steps */}
            <div className="space-y-3">
              {steps.map((step) => {
                const StepIcon = stepIcons[step.id as keyof typeof stepIcons] || Clock
                
                return (
                  <div key={step.id} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center">
                        {step.status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        {step.status === 'running' && (
                          <Loader className="w-4 h-4 animate-spin text-blue-500" />
                        )}
                        {step.status === 'pending' && (
                          <StepIcon className="w-4 h-4 text-muted-foreground" />
                        )}
                        {step.status === 'error' && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className={cn(
                          "text-sm font-medium",
                          step.status === 'completed' && 'text-green-600',
                          step.status === 'running' && 'text-blue-600',
                          step.status === 'pending' && 'text-muted-foreground',
                          step.status === 'error' && 'text-red-600'
                        )}>
                          {step.name}
                        </div>
                        
                        {step.details && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {step.details}
                          </div>
                        )}
                      </div>
                      
                      {step.status === 'running' && (
                        <div className="text-xs text-muted-foreground">
                          {step.progress}%
                        </div>
                      )}
                    </div>
                    
                    {step.status === 'running' && (
                      <div className="ml-9">
                        <Progress value={step.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            
            {/* Current Activity */}
            {currentStep && (
              <div className="pt-2 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="w-3 h-3" />
                  <span>Currently: {currentStep}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}