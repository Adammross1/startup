# CS 260 Notes

[My startup - Simon](https://mentalloadbearer.me/)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.235.144.190
There was a big roadblock initally with AWS needing to verify my account before I could register a domain using Route53, so I registered a domain with namecheap.com instead. There was helpful documentation to get that namecheap domain connected to my ec2 instance in AWS so that went very smoothly. 

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md). I know this is the default note but this was my experience. It was very nice to already have this set up and easily configurable. I'm not a huge fan of vim so I edited the Caddyfile using nano instead. Just personal preference.

## HTML

Key HTML concepts used in my startup:

**Semantic Elements** - Used `<aside>` for sidebar, `<section>` for grouped content, `<article>` for self-contained content. This makes the HTML more readable and accessible.

**Dialog Element** - `<dialog>` is perfect for modals. Much cleaner than divs with display:none. Use `method="dialog"` on forms inside dialogs.

**Form Structure** - `<fieldset>` and `<legend>` group related inputs. Makes forms more semantic and accessible.

**Accessibility** - Every `<input>` needs a `<label>`. Icon-only buttons need `aria-label`. The `required` attribute helps with validation.

## CSS

This was a pretty easy assignment for me because I am already very proficient in CSS and I work in SCSS usually so I'm all about organization, structure, and using proper specificity. I like having a variables css file which is what I made my styles.css file into. I also use tailwind sometimes but this project is so small that I thought it would be easy enough to make my own variables to use throughout the app kind of like my own tailwind.

## React Part 1: Routing

Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
