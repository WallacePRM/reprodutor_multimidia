export const formatHHMMSS = (time: number) => {

    const hourTemp = time / 3600;
    const hour = Math.trunc(hourTemp);

    const minutesTemp = (hourTemp - hour) * 60;
    const minutes =  Math.trunc(minutesTemp);

    const seconds = Math.round((minutesTemp - minutes) * 60);

    const hStr = hour.toString().padStart(2, '0');
    const mStr = minutes.toString().padStart(2, '0');
    const sStr = seconds.toString().padStart(2, '0');

    return `${hStr}:${mStr}:${sStr}`;
};

export const formatMMSS = (time: number) => {

    const hourTemp = time / 3600;
    const hour = Math.trunc(hourTemp);

    const minutesTemp = (hourTemp - hour) * 60;
    const minutes =  Math.trunc(minutesTemp);

    const seconds = Math.round((minutesTemp - minutes) * 60);

    const mStr = minutes.toString().padStart(2, '0');
    const sStr = seconds.toString().padStart(2, '0');

    return `${mStr}:${sStr}`;
};