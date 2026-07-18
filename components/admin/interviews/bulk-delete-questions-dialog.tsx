"use client";

import { Trash2Icon } from "lucide-react";
import { bulkInterviewQuestionsAction } from "@/actions/admin/interviews";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function BulkDeleteQuestionsDialog({ ids }: { ids: string[] }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" size="sm" variant="destructive">
          <Trash2Icon className="size-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {ids.length} selected question{ids.length === 1 ? "" : "s"}?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes the selected questions and their answers, comments, and votes. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={bulkInterviewQuestionsAction}>
            <input type="hidden" name="bulkAction" value="DELETE" />
            {ids.map((id) => <input key={id} type="hidden" name="questionIds" value={id} />)}
            <AlertDialogAction type="submit" className="bg-destructive/10 text-destructive hover:bg-destructive/20">
              Delete permanently
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
