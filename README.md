# install-fonts (windows only)
Action module to be used with nexrender as pre-render action to install fonts used in the template

# Action: Install Fonts

Install fonts to your windows system
.


```
npm i install-fonts -g
```

## Usage

When creating your render job provide this module as one of the `prerender` actions:

```json
// job.json
{
  "actions": {
    "prerender": [
      {
        "module": "install-fonts",
        "fonts":[
            {
                "name":"Font Name",
                "src":"Font File Url"
            },
            {
                "name":"Another Font Name",
                "src":"Another Font File Url"
            },

            ]
      }
    ]
  }
}
```

## Information
`install-fonts` should be run with administrative privilege in order to install fonts on your windows system.

## Usage without Nexrender's Job Context
see `./sandbox.js` for usage
