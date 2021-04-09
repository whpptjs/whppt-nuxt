export default function(value) {
  const valueWithNoWhiteAround = value.trim();
  const htmlWithTrimBetween = valueWithNoWhiteAround
    .replace(/\n/g, '')
    .replace(/[\t ]+</g, '<')
    .replace(/>[\t ]+</g, '><')
    .replace(/>[\t ]+$/g, '>');

  return htmlWithTrimBetween;
}
