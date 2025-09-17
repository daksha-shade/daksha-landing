"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import { useState } from "react";
import { AgentRole } from "@/agents/config";
import { Badge } from "@/components/ui/badge";
import { Bot, Sparkles, Search, Loader2, Brain, PenTool, Heart, Target, Database } from "lucide-react";

interface AgentIndicatorProps {
    agent: AgentRole;
    isThinking?: boolean;
}

function AgentIndicator({ agent, isThinking }: AgentIndicatorProps) {
    const agentColors = {
        core: "bg-blue-500",
        journal: "bg-purple-500",
        productivity: "bg-green-500",
        intelligence: "bg-orange-500",
        writing: "bg-pink-500",
        wellness: "bg-teal-500",
        search: "bg-yellow-500",
        memory: "bg-indigo-500",
    };

    const agentIcons = {
        core: Bot,
        journal: Sparkles,
        productivity: Target,
        intelligence: Brain,
        writing: PenTool,
        wellness: Heart,
        search: Search,
        memory: Database,
    };

    const Icon = agentIcons[agent];

    return (
        <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${agentColors[agent]} ${isThinking ? 'animate-pulse' : ''}`} />
            <Badge variant="secondary" className="text-xs">
                <Icon className="w-3 h-3 mr-1" />
                {agent.replace("_", " ").toLowerCase()}
                {isThinking && <Loader2 className="w-3 h-3 ml-1 animate-spin" />}
            </Badge>
        </div>
    );
}

export function ChatInterface() {
    const [currentAgent] = useState<AgentRole>("core");
    const [isProcessing] = useState(false);

    const runtime = useChatRuntime({
        api: "/api/chat",
    });

    return (
        <div className="flex flex-col h-[90vh] w-full py-6">
            {/* Chat Container */}
            <div className="flex-1 overflow-hidden rounded-xl mx-6">
                <AssistantRuntimeProvider runtime={runtime}>
                    <Thread />
                </AssistantRuntimeProvider>
            </div>
        </div>
    );
}