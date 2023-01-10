import htmlReactParser from "html-react-parser"

export function urlify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const tagRegex = /(<([^>]+)>)/gi;

  const removeTagText = text.replace(tagRegex, " ")
  const replacedText = removeTagText.replace(urlRegex, function (url) {
    return `<a href=${url} target="_blank"> ${url}</a>`
  })
  return htmlReactParser(replacedText)
}
