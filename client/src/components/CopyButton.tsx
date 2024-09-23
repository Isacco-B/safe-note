import * as React from "react";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface CopyButtonProps extends ButtonProps {
  value: string;
}

function copyToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text);
}

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

export function CopyButton({
  value,
  className,
  variant = "default",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  const { toast } = useToast();

  React.useEffect(() => {
    if (hasCopied) {
      toast({
        title: "Copied!",
        description: "Note link copied to clipboard.",
      });
    }

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied, toast]);

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn("[&_svg]:h-4 [&_svg]:w-4 w-14", className)}
      onClick={() => {
        copyToClipboard(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  );
}
