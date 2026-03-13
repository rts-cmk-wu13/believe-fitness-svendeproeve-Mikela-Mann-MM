



"use client";

import { useState } from "react";
import { useActionState } from "react";
import {
  createClassAction,
  updateClassActionState,
} from "@/lib/actions";
import FormError from "@/components/ui/FormError";
import {
  initialCreateClassState, CreateClassState
} from "@/types";
import type { TrainerSummary, FitnessClass, } from "@/types";


const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface Props {
  trainers: TrainerSummary[];
  existingClass?: FitnessClass;
}

export default function CreateClassForm({ trainers, existingClass }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const isEdit = Boolean(existingClass);

  const initialState: CreateClassState = existingClass ? {
    values: {
      className: existingClass.className,
      classDescription: existingClass.classDescription,
      classDay: existingClass.classDay,
      classTime: existingClass.classTime,
      maxParticipants: existingClass.maxParticipants,
      trainerId: existingClass.trainerId,
      assetId: existingClass.assetId,
    },
    errors: {},
  }
    : initialCreateClassState;

  const action = isEdit ? updateClassActionState : createClassAction;

  const [state, formAction, isPending] = useActionState<CreateClassState, FormData>(
    async (_prev: CreateClassState, formData: FormData) => {
      if (file) formData.set("file", file);
      return action(_prev, formData);
    },
    initialState
  );

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      {isEdit && <input type="hidden" name="id" value={existingClass!.id} />}
      <input type="hidden" name="assetId" value={existingClass?.assetId ?? 1} />

      <div>
        <input
          type="text"
          name="className"
          defaultValue={state.values.className}
          placeholder="Class name..."
          className="form-input"
        />
        <FormError message={state.errors.className} />
      </div>

      <div>
        <textarea
          name="classDescription"
          defaultValue={state.values.classDescription}
          placeholder="Class description..."
          rows={3}
          className="form-input"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <select
            name="classDay"
            defaultValue={state.values.classDay}
            className="form-input rounded-2xl"
          >
            <option value="">Class day...</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <input
            type="time"
            name="classTime"
            defaultValue={state.values.classTime}
            placeholder="Class time..."
            className="form-input"
          />
        </div>
      </div>


      {trainers.length > 0 && (
        <div>
          <select
            name="trainerId"
            defaultValue={state.values.trainerId}
            className="form-input rounded-2xl"
          >
            <option value="">Class trainer...</option>
            {trainers.map((t) => (
              <option key={t.id} value={t.id}>{t.trainerName}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <input
          type="number"
          name="maxParticipants"
          min={1}
          max={100}
          placeholder="Max participants in class..."
          className="form-input"
        />
      </div>

      <div>
        <p className="text-sm mb-2 pb-2">Choose an image:</p>
        <div className="flex items-center gap-3">
          <label className="px-4 py-2 border border-(--grey-border) rounded text-sm cursor-pointer whitespace-nowrap">
            Browse...
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <span className="text-(--grey-mid) text-sm">
            {file ? file.name : "No file chosen"}
          </span>
        </div>
      </div>

      <FormError message={state.errors.general} />

      <button type="submit" disabled={isPending} className="btn-primary mt-2">
        {isPending ? "Saving…" : isEdit ? "SAVE CHANGES" : "CREATE CLASS"}
      </button>
    </form>
  );
}