"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSubject } from "@/hooks/useSubjects";
import { useReorderTasks } from "@/hooks/useTasks";
import { SubjectHeader } from "@/app/components/subject/subject-header";
import { MilestoneSection } from "@/app/components/subject/milestone-section";
import { ResourceSection } from "@/app/components/subject/resource-section";
import { TaskRow } from "@/app/components/subject/task-row";
import { AddTask } from "@/app/components/subject/add-task";
import { SortableList } from "@/app/components/subject/sortable-list";

const FALLBACK = "#8b8f9e";

export default function SubjectPage() {
  const { id } = useParams<{ id: string }>();
  const { status } = useSession({ required: true });
  const { data: subject, isLoading, isError } = useSubject(id);
  const reorderTasks = useReorderTasks();

  if (status === "loading" || isLoading) {
    return (
      <main className="w-full px-4 py-10 sm:px-6 lg:px-10 xl:px-16">
        <p className="lk-mono text-sm text-muted-foreground">loading…</p>
      </main>
    );
  }

  if (isError || !subject) {
    return (
      <main className="w-full px-4 py-16 text-center sm:px-6 lg:px-10 xl:px-16">
        <p className="lk-display text-lg font-bold">Subject not found</p>
        <p className="mt-1 text-sm text-muted-foreground">It may have been deleted.</p>
        <Link href="/" className="lk-btn mt-5 inline-block px-3 py-2 text-[10.5px]">
          Back to subjects
        </Link>
      </main>
    );
  }

  const looseDone = subject.tasks.filter((t) => t.isCompleted).length;
  const allTasks = [...subject.milestones.flatMap((m) => m.tasks), ...subject.tasks];
  const totalDone = allTasks.filter((t) => t.isCompleted).length;

  return (
    <main
      className="lk-subject w-full px-4 py-6 sm:px-6 lg:px-10 xl:px-16"
      style={{ "--c": subject.color ?? FALLBACK } as React.CSSProperties}
    >
      <SubjectHeader subject={subject} />

      <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-3 xl:grid-cols-4">
        {/* Plan + loose tasks */}
        <div className="flex flex-col gap-7 lg:col-span-2 xl:col-span-3">
          <MilestoneSection subjectId={subject.id} color={subject.color} milestones={subject.milestones} />

          <section>
            <div className="lk-sec mb-3">
              tasks · no milestone{subject.tasks.length > 0 ? ` · ${looseDone}/${subject.tasks.length}` : ""}
            </div>
            <div className="lk-card lk-tree flex flex-col p-2">
              <SortableList
                ids={subject.tasks.map((t) => t.id)}
                onReorder={(ids) => reorderTasks.mutate({ ids })}
              >
                {subject.tasks.map((t) => (
                  <TaskRow key={t.id} task={t} />
                ))}
              </SortableList>
              <div data-depth="1" className="lk-tsub">
                <AddTask subjectId={subject.id} />
              </div>
            </div>
          </section>
        </div>

        {/* Resources */}
        <div className="lg:col-span-1">
          <ResourceSection subjectId={subject.id} resources={subject.resources} />
        </div>
      </div>

      <div className="lk-statusbar mt-10">
        <span className="seg mode">LOCKIN</span>
        <span className="seg">{subject.milestones.length} milestones</span>
        <span className="seg">{totalDone}/{allTasks.length} tasks</span>
        <span className="seg">{subject.resources.length} resources</span>
        <span className="seg grow" />
        <span className="seg">~/lockin/{subject.title.toLowerCase().replace(/\s+/g, "-")}</span>
      </div>
    </main>
  );
}
