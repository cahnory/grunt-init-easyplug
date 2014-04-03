# {%= title || name %}

{%= description %}

## Getting Started

1 . load jquery
2 . load easyPlug
3 . load {%= name %}
4 . you are ready to use {%= name %}

```html
<script src="jquery.js"></script>
<script src="jquery.easyplug.js"></script>
<script src="{%= name %}.min.js"></script>
<script>
jQuery(function($) {
  $('foo').{%= name %}();
});
</script>
```