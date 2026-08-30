import { Suspense } from "react";
import type { Metadata } from "next";
import ArticlesExplorer from "@/components/ArticlesExplorer";
import { getAllPosts, getCategoriesWithCounts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Artigos",
  description: "Todos os artigos do ARS GEEK — filtre por categoria ou busque no arquivo.",
  alternates: { canonical: "/artigos" },
};

export default function ArtigosPage() {
  const posts = getAllPosts();
  const categories = getCategoriesWithCounts();

  return (
    <main className="container page-pad">
      <Suspense fallback={null}>
        <ArticlesExplorer posts={posts} categories={categories} />
      </Suspense>
    </main>
  );
}
