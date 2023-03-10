# Comments/Notes block

### Native JS + SCSS

:star: Сохраните ваши заметки в отдельном блоке
:star: Укажите дату
:star: Отсортируйте по рейтингу/дате

![preview](https://github.com/Istiniel/comments-nativeJS/tree/main/src/images/user_preview.png)

### Пример используемого в данном приложении кода (JS native)

```js
function validateName(name) {
  if (name.length < 2) return 'Name should contain at least 2 characters';

  if (!/[A-ZА-Я]/.test(name)) {
    return 'Name should contain at least 1 uppercase';
  }

  return false;
}

export default validateName;
```

### Пример используемого в данном приложении кода (SCSS)

```scss
$breakpoints: (
  xSmall: $break-xs,
  small: $break-sm,
  medium: $break-md,
  large: $break-lg,
  xLarge: $break-xl,
);

// max-width
@mixin maxQ($key) {
  $size: map.get($breakpoints, $key);

  @media (max-width: $size) {
    @content;
  }
}
```
