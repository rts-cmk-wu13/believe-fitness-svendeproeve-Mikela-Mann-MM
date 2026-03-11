



"use client";

import { useActionState } from "react";
import {
  createClassAction,
  updateClassActionState,
  initialCreateClassState,
  type CreateClassState,
} from "@/lib/actions";
import FormError from "@/components/ui/FormError";
import type { TrainerSummary, FitnessClass } from "@/types"; 

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface Props {
    trainers: TrainerSummary[];
    existingClass?: FitnessClass;
}

export default function CreateClassForm({ trainers, existingClass }: Props) {
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
    action,
    initialState
  );

  return (
      <form action={formAction} noValidate className="flex flex-col gap-4">
     {isEdit && <input type="hidden" name="id" value={existingClass!.id} />}
      <input type="hidden" name="assetId" value={existingClass?.assetId ?? 1} />

        <div>
            <label className="text-sm font-medium block mb-1">Class name</label>
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
            <label className="text-sm font-medium block mb-1">Description</label>
          <textarea 
          name="classDescription"
          defaultValue={state.values.classDescription} 
          placeholder="Class Description..." 
          rows={3}
          className="form-input" 
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-sm font-medium block mb-1">Day</label>
            <select 
            name="classDay"
          defaultValue={state.values.classDay} 
          className="form-input rounded-2xl" 
          >
            {DAYS.map((d) => (
                <option key={d} value={d}>{d}</option>
            ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium block mb-1">Time</label>
            <input 
            type="time"
            name="classTime"
          defaultValue={state.values.classTime} 
          className="form-input" 
          />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Max participants</label>
            <input 
            type="number"
            name="maxParticipants"
            min={1}
            max={100}
          defaultValue={state.values.maxParticipants} 
          className="form-input" 
          />
          </div>

          {trainers.length > 0 && (
            <div>
               <label className="text-sm font-medium block mb-1">Trainer</label>
            <select
            name="trainerId"
          defaultValue={state.values.trainerId} 
          className="form-input rounded-2xl" 
          >
            {trainers.map((t) => (
                <option key={t.id} value={t.id}>{t.trainerName}</option>
            ))} 
            </select>
            </div>
          )}

        <FormError message={state.errors.general} />

        <button type="submit" disabled={isPending} className="btn-primary mt-2">
          {isPending ? "Saving…" : isEdit ? "SAVE CHANGES" : "CREATE CLASS"}
        </button>
      </form>
  );
}