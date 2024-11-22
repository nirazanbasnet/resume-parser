import { NextResponse } from 'next/server';
import * as pdfjsLib from 'pdfjs-dist';

export async function GET() {
  const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  return NextResponse.json({ workerSrc });
} 