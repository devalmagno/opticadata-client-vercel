type Props = {
    date: Date;
}

export const FormatedDateAndHour = ({ date }: Props) => {
    let formatedDate = new Date(date);
    let hour = `${formatedDate.getHours()}:${formatedDate.getMinutes()}`
    let usableDate = `${formatedDate.getDate()}/${formatedDate.getMonth()}/${formatedDate.getFullYear()}`;

    return <span>{`${hour} - ${usableDate}`}</span>;
}