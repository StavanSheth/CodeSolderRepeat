import { Incident } from '@/services/wasteIntelligenceApi';

/**
 * Calculate PIA (Priority-Impact-Actionability) score
 * PIA = Priority Weight × Volume Weight × Confidence Weight
 */
export function calculatePIAScore(incident: Incident): number {
  const priorityWeights: Record<string, number> = {
    'High': 1.0,
    'Medium': 0.6,
    'Low': 0.3,
  };

  const volumeWeights: Record<string, number> = {
    'Large': 1.0,
    'Medium': 0.7,
    'Small': 0.4,
  };

  const priorityWeight = priorityWeights[incident.priority.level] || 0.5;
  const volumeWeight = volumeWeights[incident.classification.estimatedVolume.category] || 0.5;
  const confidenceWeight = 0.9; // From API confidence

  return Math.round(priorityWeight * volumeWeight * confidenceWeight * 100);
}

/**
 * Get severity color based on PIA score
 */
export function getSeverityColor(pia: number): {
  bg: string;
  text: string;
  badge: string;
} {
  if (pia >= 80) {
    return {
      bg: 'bg-red-50',
      text: 'text-red-700',
      badge: 'bg-red-100 text-red-700',
    };
  }
  if (pia >= 60) {
    return {
      bg: 'bg-orange-50',
      text: 'text-orange-700',
      badge: 'bg-orange-100 text-orange-700',
    };
  }
  return {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    badge: 'bg-yellow-100 text-yellow-700',
  };
}

/**
 * Get priority color for UI
 */
export function getPriorityColor(level: string): string {
  switch (level) {
    case 'High':
      return 'text-red-600';
    case 'Medium':
      return 'text-orange-600';
    case 'Low':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
}

/**
 * Format incident for activity log
 */
export function createActivityLog(action: string, description: string) {
  return {
    timestamp: new Date(),
    action,
    description,
  };
}

/**
 * Generate task ID from incident
 */
export function generateTaskId(incident: Incident): string {
  return incident.id || `task-${Date.now()}`;
}
