import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "../constants";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { ButtonLoading } from "./ButtonLoading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function SelectDuration({
  onChange,
  defaultValue,
}: {
  onChange: (value: string) => void;
  defaultValue: string;
}) {
  return (
    <Select
      onValueChange={(value) => onChange(value)}
      defaultValue={defaultValue}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a duration" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="60">1 hour</SelectItem>
          <SelectItem value="1440">1 day</SelectItem>
          <SelectItem value="4320">3 days</SelectItem>
          <SelectItem value="10080">7 days</SelectItem>
          <SelectItem value="20160">14 days</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

type FormData = {
  title: string;
  content: string;
  expiresIn: number;
};

export default function NoteForm({
  setNoteLink,
}: {
  setNoteLink: (link: string) => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    expiresIn: 60,
  });

  const { toast } = useToast();

  const handleDurationChange = (value: string) => {
    setFormData({
      ...formData,
      expiresIn: parseInt(value, 10),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}/create-note`,
        {
          title: formData.title,
          content: formData.content,
          expiresIn: formData.expiresIn,
        }
      );
      setNoteLink(import.meta.env.VITE_CLIENT_HOST + /note/ + response.data.link);
      setShowAdvanced(false);
      toast({
        title: "Success!",
        description: "Note created successfully.",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
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
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col gap-6 border p-4 rounded-md shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="grid w-full md:w-1/2 items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Note Title"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="content">Content</Label>
          <ReactQuill
            theme="snow"
            modules={{ toolbar: toolbarOptions }}
            placeholder="Write something..."
            id="content"
            value={formData.content}
            onChange={(value) => {
              if (value.trim() === "" || value === "<p><br></p>") {
                setFormData({ ...formData, content: ""});
              } else {
                setFormData({ ...formData, content: value });
              }
            }}
          />
        </div>
        {showAdvanced && (
          <div className="grid w-full md:w-1/2 items-center gap-1.5">
            <Label htmlFor="expires">Expires after</Label>
            <SelectDuration
              onChange={handleDurationChange}
              defaultValue={formData.expiresIn.toString()}
            />
          </div>
        )}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Button
            variant="outline"
            className="w-full font-poppins font-semibold"
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
          </Button>
          {isLoading ? (
            <ButtonLoading />
          ) : (
            <Button type="submit" className="w-full font-poppins font-semibold">
              Create Message
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
