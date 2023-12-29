interface IPreset {
    name: string;
    force: string;
    level: string;
    mechanic: string;
    equipment: string;
    primaryMuscles: string[];
    secondaryMuscles: string[];
    instructions: string[];
    category: string;
    images: string[];
    id: string;
    isSelected?: boolean;
    pauseTime?: number;
    presetName: string;
    seriesNumber: number;
    timePerSet: number;
}

export default IPreset;