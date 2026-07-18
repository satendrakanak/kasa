"use client";

import {
  Copy,
  Mail,
  MoreHorizontal,
  Share2,
  Smartphone,
} from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTelegram,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type ArticleShareProps = {
  title: string;
  url: string;
  description?: string;
  placement?: "top" | "bottom";
};

export function ArticleShare({
  title,
  url,
  description,
  placement = "bottom",
}: ArticleShareProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(description || title);

  function openShareWindow(shareUrl: string) {
    window.open(
      shareUrl,
      "kasa-article-share",
      "noopener,noreferrer,width=720,height=640",
    );
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Article link copied");
    } catch {
      toast.error("Could not copy the article link");
    }
  }

  async function shareWithDevice() {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title, text: description || title, url });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error("Sharing could not be opened");
    }
  }

  const itemClasses =
    "gap-3 rounded-xl px-3 py-2.5 font-medium text-foreground focus:bg-accent focus:text-accent-foreground";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-border bg-card font-semibold text-primary shadow-sm transition hover:border-primary/35 hover:bg-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15",
            placement === "top"
              ? "h-9 px-4 text-sm"
              : "h-10 px-5 text-sm",
          )}
        >
          <Share2 className="size-4" />
          Share
          <MoreHorizontal className="size-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={placement === "top" ? "start" : "end"}
        sideOffset={8}
        className="w-72 rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-2xl"
      >
        <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
          Share this article
        </DropdownMenuLabel>
        <DropdownMenuItem className={itemClasses} onSelect={shareWithDevice}>
          <span className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary">
            <Smartphone className="size-4" />
          </span>
          Device sharing options
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2 bg-border" />
        <div className="grid grid-cols-2 gap-1">
          <DropdownMenuItem
            className={itemClasses}
            onSelect={() =>
              openShareWindow(`https://wa.me/?text=${encodedText}%20${encodedUrl}`)
            }
          >
            <FaWhatsapp className="size-4 text-primary" /> WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem
            className={itemClasses}
            onSelect={() =>
              openShareWindow(
                `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
              )
            }
          >
            <FaFacebookF className="size-4 text-primary" /> Facebook
          </DropdownMenuItem>
          <DropdownMenuItem
            className={itemClasses}
            onSelect={() =>
              openShareWindow(
                `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
              )
            }
          >
            <FaXTwitter className="size-4 text-foreground" /> X
          </DropdownMenuItem>
          <DropdownMenuItem
            className={itemClasses}
            onSelect={() =>
              openShareWindow(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
              )
            }
          >
            <FaLinkedinIn className="size-4 text-primary" /> LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem
            className={itemClasses}
            onSelect={() =>
              openShareWindow(
                `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
              )
            }
          >
            <FaTelegram className="size-4 text-primary" /> Telegram
          </DropdownMenuItem>
          <DropdownMenuItem
            className={itemClasses}
            onSelect={() => {
              window.location.href = `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`;
            }}
          >
            <Mail className="size-4 text-primary" /> Email
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="my-2 bg-border" />
        <DropdownMenuItem className={itemClasses} onSelect={copyLink}>
          <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-foreground">
            <Copy className="size-4" />
          </span>
          Copy article link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
