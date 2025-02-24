import { Student } from '@/types/student';
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    // 读取JSON文件
    const dataDir = path.join(process.cwd(), "data");
    const files = ["2021.json", "2022.json", "2023.json", "2024.json"];

    let allStudents: Student[] = [];

    for (const file of files) {
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const students = JSON.parse(fileContent).aaData as Student[];
        allStudents = [...allStudents, ...students];
    }

    // 实现搜索逻辑
    const filteredStudents = allStudents.filter(student =>
        student.XM.includes(query) || student.BJMC.includes(query) || student.XH.includes(query)
    );

    return NextResponse.json(filteredStudents);
}