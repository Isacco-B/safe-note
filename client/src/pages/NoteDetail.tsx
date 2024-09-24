import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Note = {
  title: string;
  content: string;
};

export default function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note>({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_HOST}/note/${id}`
        );
        setNote(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "Failed to fetch note.");
          toast({
            title: "Uh oh! Something went wrong.",
            description:
              error.response?.data?.message ||
              "Failed to create note. Please try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "Failed to create note. Please try again.",
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[500px]">
        <Loader2 className="h-12 w-12 animate-spin text-neutral-600" />
      </div>
    );
  if (error)
    return (
      <Card className="w-full md:w-1/2 mx-auto">
        <CardHeader>
          <CardTitle>This link has expired.</CardTitle>
          <CardDescription>
            Sorry! We are unable to serve with this link because this link has
            already expired.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/">
            <Button className="w-full">Try Safe Note</Button>
          </Link>
        </CardContent>
      </Card>
    );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{note?.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          dangerouslySetInnerHTML={{
            __html: note && note.content,
          }}
          className="ql-editor quill-content bg-card shadow-sm border rounded-lg p-8"
        ></div>
      </CardContent>
      <CardFooter>
        <Link to="/" className="w-full">
          <Button className="w-full">Try Safe Note</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
