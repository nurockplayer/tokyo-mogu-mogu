/** Active withdrawals keyed by journey ID. Keep this registry when rebuilding a rollback. */
export const journeyWithdrawals: Record<string, { recordedAt: string; reason: string }> = {};
