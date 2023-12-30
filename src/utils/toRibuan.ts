const toRibuan = (num: string | number) => {
    return Number(num)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export default toRibuan;
