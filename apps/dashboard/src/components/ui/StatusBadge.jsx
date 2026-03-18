import Badge from './Badge';
import { getStatusColors, getStatusLabel } from '../../lib/constants';

export default function StatusBadge({ status }) {
  const colors = getStatusColors(status);
  return <Badge label={getStatusLabel(status)} bg={colors.bg} text={colors.text} />;
}
