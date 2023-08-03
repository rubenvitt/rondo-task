import loadAppTheme from '@/server/appTheme';

export type AppTheme = PromiseType<ReturnType<typeof loadAppTheme>>;
