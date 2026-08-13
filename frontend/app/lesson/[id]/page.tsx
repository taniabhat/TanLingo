import LessonPlayer from "@/components/LessonPlayer";

export default function LessonPage({ params }: { params: { id: string } }) {
  return <LessonPlayer lessonId={parseInt(params.id, 10)} />;
}
