"use client";

import { useState, useCallback } from "react";
import SearchBar from "@/components/SearchBar";
import { Student } from "@/types/student";

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setLastQuery(query);
    try {
      const response = await fetch(`/api?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("搜索出错：", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} isLoading={loading} />
      </div>
      {loading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg text-normal"></span>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-4">
            {lastQuery && students.length > 0 && (
              <div className="text-sm text-gray-500 mb-4">
                搜索 &apos;{lastQuery}&apos; 找到 {students.length} 条结果
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th className="font-bold">学号</th>
                    <th className="font-bold">姓名</th>
                    <th className="font-bold">班级</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.XH} className="hover">
                      <td>{student.XH}</td>
                      <td>{student.XM}</td>
                      <td>{student.BJMC}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {students.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                  <p className="mt-4 font-medium">暂无数据，请输入关键词搜索</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
