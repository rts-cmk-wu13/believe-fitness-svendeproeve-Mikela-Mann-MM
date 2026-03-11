



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
        className:className
        classDescription:classDescription
        classDay:
        classTime:
        maxParticipants:
        trainerId:
        assetId:
    },
    errors: {},
 }
 :initialCreateClassState

 const action = isEdit ? updateClassAction : createClassAction;

  const [state, formAction, isPending] = useActionState<CreateClassState, FormData>(
    action,
    initialState
  );

  return (
      <form action={formAction} noValidate className="flex flex-col gap-3">

        <div>
          <input className="form-input" name="name" placeholder="Holdnavn" />
        </div>

        <div>
          <textarea
            className="form-input resize-none"
            style={{ minHeight: "7.5rem" }}
            name="description"
            placeholder="Beskrivelse"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <select className="form-input" name="weekday">
              <option value="">Ugedag</option>
              {WEEKDAYS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <input className="form-input" type="time" name="time" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <input className="form-input" type="number" min={0} name="minAge" placeholder="Alder (min.)" />
          </div>
          <div>
            <input className="form-input" type="number" min={0} name="maxAge" placeholder="Alder (max.)" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <select className="form-input opacity-60" disabled>
              <option>Instruktør</option>
            </select>
          </div>
          <div>
            <input className="form-input" type="number" min={1} name="maxParticipants" placeholder="Deltagere (max.)" />
          </div>
        </div>

        <div>
          <p className="text-white text-sm mb-2">Billede:</p>
          <div className="flex items-center gap-3">
            <label className="px-4 py-2 bg-(--grey-light) rounded text-sm text-(--brand-dark) cursor-pointer whitespace-nowrap">
              Gennemse...
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>
            <span className="text-(--grey-mid) text-sm">
              {file ? file.name : "Ingen fil valgt"}
            </span>
          </div>
        </div>

        <FormError message={state?.error} />

        <button type="submit" disabled={isPending} className="btn-primary mt-2">
          {isPending ? "Opretter…" : "Opret hold"}
        </button>

      </form>
   
  );
}