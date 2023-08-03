# Input

## InputDemo

<Input label='label' type='password' color="#111" />

::: details

```
import { defineComponent } from 'vue'
import { Input } from 'wa-components'

export default defineComponent({
  setup() {
    return () => {
      return <Input></Input>
    }
  }
})

```

:::

<script lang="ts" setup>
import { Input } from '../../src/index'
</script>
