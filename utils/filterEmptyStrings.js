
module.exports = (stringList) => {
    stringList.filter((stringItem) => {
        return stringItem != '';
    });
    return stringList;
}