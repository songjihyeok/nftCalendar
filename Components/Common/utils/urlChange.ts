export const urlChange = (str) => {
  var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
  //특수문자 검증
  if (reg.test(str)) {
    //특수문자 제거후 리턴
    return false
  } else {
    //특수문자가 없으므로 본래 문자 리턴
    return true
  }
}