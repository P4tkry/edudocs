import { runC } from '@/actions/runC';
import CEditorClient from './CEditorClient';

type CEditorProps = {
  initialCode?: string;
  filename?: string;
};

export default function CEditor(props: CEditorProps) {
  return <CEditorClient {...props} runCAction={runC} />;
}
