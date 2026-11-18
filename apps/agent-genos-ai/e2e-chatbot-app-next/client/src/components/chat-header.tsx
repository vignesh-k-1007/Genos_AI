import { useNavigate } from 'react-router-dom';
import genosLogo from '../assets/genos_ai_logo.png';

import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { MessageSquareOff, TriangleAlert } from 'lucide-react';
import { useConfig } from '@/hooks/use-config';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PlusIcon, CloudOffIcon } from './icons';
import { cn } from '../lib/utils';
import { Skeleton } from './ui/skeleton';

const DOCS_URL =
  'https://docs.databricks.com/aws/en/generative-ai/agent-framework/chat-app';

const OBO_DOCS_URL =
  'https://docs.databricks.com/aws/en/generative-ai/agent-framework/chat-app#enable-user-authorization';

function OboScopeBanner({ missingScopes }: { missingScopes: string[] }) {
  if (missingScopes.length === 0) return null;

  return (
    <div className="w-full border-b border-red-500/20 bg-red-50 dark:bg-red-950/20 px-4 py-2.5">
      <div className="flex items-center gap-2">
        <TriangleAlert className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
        <p className="text-sm text-red-700 dark:text-red-400">
          This endpoint requires on-behalf-of user authorization. Add these
          scopes to your app:{' '}
          <strong>{missingScopes.join(', ')}</strong>.{' '}
          <a
            href={OBO_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Learn more
          </a>
        </p>
      </div>
    </div>
  );
}

export function ChatHeader({
  title,
  empty,
  isLoadingTitle,
}: {
  title?: string;
  empty?: boolean;
  isLoadingTitle?: boolean;
}) {
  const navigate = useNavigate();
  const { chatHistoryEnabled, feedbackEnabled, oboMissingScopes } = useConfig();

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 flex h-[64px] items-center gap-3 bg-background px-4',
          {
            'border-b border-border': !empty,
          }
        )}
      >
        {/* Mobile navigation */}
        <div className="md:hidden shrink-0">
          <SidebarToggle forceOpenIcon />
        </div>

        {/* Genos AI branding */}
        <div className="flex shrink-0 items-center gap-2">
          <img
            src={genosLogo}
            alt="Genos AI"
            className="h-10 w-[140px] object-contain"
          />

          <div className="hidden lg:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-[#0F172A] dark:text-white">
              Genos AI
            </span>
            <span className="text-[10px] text-muted-foreground">
              IFC CFO Portfolio Intelligence
            </span>
          </div>
        </div>

        {/* Header actions */}
        <div className="ml-auto flex items-center gap-2 shrink-0">
          {!chatHistoryEnabled && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={DOCS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border-border border bg-muted px-2 py-1 text-foreground text-xs hover:text-foreground"
                  >
                    <CloudOffIcon className="h-3 w-3" />
                    <span className="hidden sm:inline">Ephemeral</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Chat history disabled — conversations are not saved.
                    Click to learn more.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {!feedbackEnabled && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={DOCS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border-border border bg-muted px-2 py-1 text-foreground text-xs hover:text-foreground"
                  >
                    <MessageSquareOff className="h-3 w-3" />
                    <span className="hidden sm:inline">
                      Feedback disabled
                    </span>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Feedback submission disabled. Click to learn more.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {/* New Chat button — mobile only */}
          <Button
            variant="default"
            className="order-2 ml-auto h-8 px-2 md:hidden bg-[#0D9488] hover:bg-[#0F766E]"
            onClick={() => navigate('/')}
          >
            <PlusIcon />
            <span>New Chat</span>
          </Button>
        </div>
      </header>

      <OboScopeBanner missingScopes={oboMissingScopes} />
    </>
  );
}
