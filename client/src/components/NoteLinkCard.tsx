import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "./CopyButton";
import { Button } from "./ui/button";
import { X } from "lucide-react";

type NoteLinkCardProps = {
  link: string;
  setNoteLink: (link: string) => void;
  className?: string;
};

export function NoteLinkCard({ link, className, setNoteLink }: NoteLinkCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>Shareable Link</CardTitle>
          <Button variant="ghost" onClick={() => setNoteLink("")}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <CardDescription>
          Send the link to whom you want to view.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Link</Label>
            <div className="flex flex-row gap-2">
              <Input
                id="name"
                placeholder="Name of your project"
                readOnly
                value={link}
              />
              <CopyButton value={link} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
