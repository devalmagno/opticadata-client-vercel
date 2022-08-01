type Props = {
    date: Date;
}

export const FormatedDate = ({ date }: Props) => {
    let formatedDate = new Date(date);
    let usableDate = `${formatedDate.getDate()}/${formatedDate.getMonth()}/${formatedDate.getFullYear()}`;

    return <span>{usableDate}</span>;
}