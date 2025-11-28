import { NextRequest, NextResponse } from 'next/server';
import { createCanvas } from '@napi-rs/canvas';
import GifEncoder from 'gif-encoder-2';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const runtime = 'nodejs'; // Required for @napi-rs/canvas

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const time = searchParams.get('time');
  const width = parseInt(searchParams.get('width') || '400');
  const height = parseInt(searchParams.get('height') || '100');
  const bg = searchParams.get('bg') || '#ffffff';
  const color = searchParams.get('color') || '#000000';
  const label = searchParams.get('label') || '';

  if (!time) {
    return new NextResponse('Missing time parameter', { status: 400 });
  }

  const targetDate = dayjs(time);
  if (!targetDate.isValid()) {
    return new NextResponse('Invalid time parameter', { status: 400 });
  }

  const encoder = new GifEncoder(width, height);
  encoder.setDelay(1000); // 1 second delay between frames
  encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
  encoder.setQuality(10); // Image quality
  encoder.start();

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Generate 60 frames (1 minute of countdown)
  // This is a balance between file size and "real-time" feel.
  // Email clients will loop the GIF, so after 60s it will jump back.
  // Ideally, we'd generate more frames or use a shorter loop if acceptable.
  const frames = 60;

  for (let i = 0; i < frames; i++) {
    const currentDate = dayjs().add(i, 'seconds');
    const diff = targetDate.diff(currentDate);

    // Clear background
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // Draw Text
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (diff <= 0) {
      ctx.font = 'bold 30px sans-serif';
      ctx.fillText('EXPIRED', width / 2, height / 2);
    } else {
      const dur = dayjs.duration(diff);
      const days = Math.floor(dur.asDays());
      const hours = dur.hours();
      const minutes = dur.minutes();
      const seconds = dur.seconds();

      const timeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      // Draw Label
      if (label) {
        ctx.font = '16px sans-serif';
        ctx.fillText(label, width / 2, height / 2 - 15);
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText(timeString, width / 2, height / 2 + 15);
      } else {
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText(timeString, width / 2, height / 2);
      }
    }

    encoder.addFrame(ctx as any);
  }

  encoder.finish();
  const buffer = encoder.out.getData();

  return new NextResponse(buffer as any, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
