-- ============================================================
-- Royal Stroje - Migration 021: Calendar tasks (dispatcher notes)
-- ============================================================
-- Week calendar (Mon-Fri, 7:00-17:00): one task = one hour slot on one day.
-- Used for phone-call notes: prenajom / vratenie / platba / servis ...
-- ============================================================

CREATE TABLE IF NOT EXISTS calendar_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_date DATE NOT NULL,
  start_hour SMALLINT NOT NULL DEFAULT 8 CHECK (start_hour BETWEEN 0 AND 23),
  title TEXT NOT NULL,
  note TEXT,
  color TEXT NOT NULL DEFAULT 'neutral' CHECK (color IN ('neutral', 'green', 'yellow', 'red')),
  done BOOLEAN NOT NULL DEFAULT false,
  reservation_id UUID REFERENCES reservations(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_calendar_tasks_date ON calendar_tasks(task_date, start_hour);

CREATE TRIGGER trg_calendar_tasks_updated
  BEFORE UPDATE ON calendar_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- RLS - staff only (no portal / anon access)
-- ============================================================
ALTER TABLE calendar_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "calendar_tasks_staff" ON calendar_tasks
  FOR ALL USING (is_staff()) WITH CHECK (is_staff());
