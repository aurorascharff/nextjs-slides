import { describe, it, expect, beforeEach } from 'vitest';
import { GET, POST } from '../src/sync';

describe('sync route handlers', () => {
  beforeEach(async () => {
    await POST(
      new Request('http://localhost/api/nxs-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slide: 1, total: 1 }),
      })
    );
  });

  it('GET returns initial state', async () => {
    const res = await GET();
    const data = await res.json();
    expect(data).toEqual({ slide: 1, total: 1 });
  });

  it('POST updates slide and total', async () => {
    const res = await POST(
      new Request('http://localhost/api/nxs-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slide: 5, total: 13 }),
      })
    );
    const data = await res.json();
    expect(data).toEqual({ slide: 5, total: 13 });
  });

  it('GET reflects the latest POST', async () => {
    await POST(
      new Request('http://localhost/api/nxs-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slide: 3, total: 10 }),
      })
    );
    const res = await GET();
    const data = await res.json();
    expect(data).toEqual({ slide: 3, total: 10 });
  });

  it('POST updates only provided fields', async () => {
    await POST(
      new Request('http://localhost/api/nxs-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slide: 7, total: 20 }),
      })
    );

    await POST(
      new Request('http://localhost/api/nxs-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slide: 8 }),
      })
    );

    const res = await GET();
    const data = await res.json();
    expect(data).toEqual({ slide: 8, total: 20 });
  });

  it('POST ignores non-numeric values', async () => {
    await POST(
      new Request('http://localhost/api/nxs-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slide: 4, total: 12 }),
      })
    );

    await POST(
      new Request('http://localhost/api/nxs-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slide: 'bad', total: null }),
      })
    );

    const res = await GET();
    const data = await res.json();
    expect(data).toEqual({ slide: 4, total: 12 });
  });
});
