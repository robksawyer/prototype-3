/**
 * @file machineGunText.js
 * @see https://codepen.io/GreenSock/pen/AGzci?editors=0010
 * @see https://codepen.io/GreenSock/pen/sxdfe?editors=1010
 * Watch a quick video on how TimelineLite allows you to sequence animations like a pro
 * https://www.greensock.com/sequence-video/
 */

/**
 * buildChunks
 * Takes a string of text and splits it into an array based on the maximum
 * length that should be allowed to exist in each line, and when it encounters the end of a
 * sentence (ending in ".", "?", or "!"), it will force a line break too.
 * @param {string} text
 * @param {int} maxLength
 * @return {array}
 */
export const buildChunks = (text, maxLength) => {
  if (maxLength === undefined) {
    return text.split(' ')
  }
  var words = text.split(' '),
    wordCount = words.length,
    chunk = [],
    chunks = [],
    i
  for (i = 0; i < wordCount; i++) {
    chunk.push(words[i])
    if (
      _sentenceEndExp.test(words[i]) ||
      i === wordCount - 1 ||
      chunk.join(' ').length + words[i + 1].length > maxLength
    ) {
      chunks.push(chunk.join(' '))
      chunk = []
    }
  }
  return chunks
}

/**
 * machineGunText
 * Handles firing off each word in the text passed like a machine gun.
 * @param {string} containerId
 * @param {string} text
 */
export const machineGunText = (containerId, text) => {
  var container = $(containerId),
    _sentenceEndExp = /(\.|\?|!)$/g //regular expression to sense punctuation that indicates the end of a sentence so that we can adjust timing accordingly

  var words = text.split(' '),
    tl = gsap.timeline({ delay: 0.6, repeat: 2, repeatDelay: 4 }),
    wordCount = words.length,
    time = 0,
    word,
    element,
    duration,
    isSentenceEnd,
    i

  for (i = 0; i < wordCount; i++) {
    word = words[i]
    isSentenceEnd = _sentenceEndExp.test(word)
    element = $('<h3>' + word + '</h3>').appendTo(container)
    duration = Math.max(0.5, word.length * 0.08) //longer words take longer to read, so adjust timing. Minimum of 0.5 seconds.
    if (isSentenceEnd) {
      duration += 0.6 //if it's the last word in a sentence, drag out the timing a bit for a dramatic pause.
    }
    //set opacity and scale to 0 initially. We set z to 0.01 just to kick in 3D rendering in the browser which makes things render a bit more smoothly.
    gsap.set(element, { autoAlpha: 0, scale: 0, z: 0.01 })
    //the SlowMo ease is like an easeOutIn but it's configurable in terms of strength and how long the slope is linear. See https://www.greensock.com/v12/#slowmo and https://api.greensock.com/js/com/greensock/easing/SlowMo.html
    tl.to(element, duration, { scale: 1.2, ease: 'slow(0.25, 0.9)' }, time)
      //notice the 3rd parameter of the SlowMo config is true in the following tween - that causes it to yoyo, meaning opacity (autoAlpha) will go up to 1 during the tween, and then back down to 0 at the end.
      .to(
        element,
        duration,
        { autoAlpha: 1, ease: 'slow(0.25, 0.9, true)' },
        time
      )
    time += duration - 0.05
    if (isSentenceEnd) {
      time += 0.6 //at the end of a sentence, add a pause for dramatic effect.
    }
  }
}

/**
 * machineGunTextWithChunks
 * @param {string} containerId
 * @param {array|string} chunks if an array isn't given, it'll make one.
 * @param {int} maxLength
 */
export const machineGunTextWithChunks = (containerId, chunks, maxLength) => {
  //in case "chunks" isn't an array, we'll build chunks automatically
  if (!(chunks instanceof Array)) {
    chunks = this.buildChunks(chunks, maxLength)
  }

  var tl = new TimelineMax({ delay: 0.6, repeat: 2, repeatDelay: 4 }),
    time = 0,
    chunk,
    element,
    duration,
    isSentenceEnd,
    i

  for (i = 0; i < chunks.length; i++) {
    chunk = chunks[i]
    isSentenceEnd = _sentenceEndExp.test(chunk) || i === chunks.length - 1
    element = $('<h3>' + chunk + '</h3>').appendTo(container)
    duration = Math.max(0.5, chunk.length * 0.08) //longer words take longer to read, so adjust timing. Minimum of 0.5 seconds.
    if (isSentenceEnd) {
      duration += 0.6 //if it's the last word in a sentence, drag out the timing a bit for a dramatic pause.
    }
    //set opacity and scale to 0 initially. We set z to 0.01 just to kick in 3D rendering in the browser which makes things render a bit more smoothly.
    TweenLite.set(element, { autoAlpha: 0, scale: 0, z: 0.01 })
    //the SlowMo ease is like an easeOutIn but it's configurable in terms of strength and how long the slope is linear. See https://www.greensock.com/v12/#slowmo and https://api.greensock.com/js/com/greensock/easing/SlowMo.html
    tl.to(
      element,
      duration,
      { scale: 1.2, ease: SlowMo.ease.config(0.25, 0.9) },
      time
    )
      //notice the 3rd parameter of the SlowMo config is true in the following tween - that causes it to yoyo, meaning opacity (autoAlpha) will go up to 1 during the tween, and then back down to 0 at the end.
      .to(
        element,
        duration,
        { autoAlpha: 1, ease: SlowMo.ease.config(0.25, 0.9, true) },
        time
      )
    time += duration - 0.05
    if (isSentenceEnd) {
      time += 0.6 //at the end of a sentence, add a pause for dramatic effect.
    }
  }
}
