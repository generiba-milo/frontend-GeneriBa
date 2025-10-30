"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { handleSubmit } from "@/pages/api";
import { toast } from "sonner";

export default function DescriptionDialog({
    open,
    setOpen,
    id,
    publickey,
}: {
    open: boolean;
    setOpen: (val: boolean) => void;
    id: string;
    publickey: string;
}) {
    const [description, setDescription] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // ✅ Auto-expand textarea height as user types
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [description]);

    const dataFetch = async (data: string[]) => {
        const mData = await handleSubmit("sql", {
            query:
                "INSERT INTO apply (uid, gid, description, publickey) VALUES (?,?,?,?)",
            params: data,
        });
        console.log(mData);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* ✅ Make dialog width 75% of screen */}
            <DialogContent className="w-[60vw] max-w-none">
                <DialogHeader>
                    <DialogTitle>Add Description</DialogTitle>
                    <DialogDescription>
                        Please enter a description below and click submit.
                    </DialogDescription>
                </DialogHeader>

                {/* ✅ Expanding textarea like ChatGPT */}
                <div className="mt-4 flex justify-center">
                    <div className="relative flex w-[99%] rounded-lg border border-gray-300 bg-transparent focus-within:ring-2 focus-within:ring-primary">
                        <textarea
                            ref={textareaRef}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write here..."
                            rows={1}
                            className="w-full resize-none overflow-hidden rounded-lg bg-transparent p-3 text-sm text-white focus:outline-none"
                        />
                    </div>
                </div>

                <DialogFooter className="flex justify-end mt-4">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        className="bg-primary text-white"
                        onClick={async () => {

                            const kData = await handleSubmit("sql", {
                                "query": "SELECT * FROM apply WHERE gid = ? AND uid = ?",
                                "params": [id, localStorage.getItem("id")]
                            });

                            console.log(kData.rows)

                            if (kData.rows.length == 0) {
                                await dataFetch([
                                    String(localStorage.getItem("id")),
                                    String(id),
                                    description,
                                    String(publickey),
                                ]);
                                setOpen(false);
                            } else {
                                toast.error('Application is already submit', {
                                    description: `You have already submitted application`
                                });
                            }
                           // console.log("Submitted:", description);

                        }}
                    >
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
