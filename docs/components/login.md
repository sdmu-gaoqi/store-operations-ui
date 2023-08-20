# Login

## LoginDemo

<Login :onFinish="onFinish"/>

::: details

```
import { defineComponent } from 'vue'
import { Login } from 'wa-components'

export default defineComponent({
  setup() {
    return () => {
      return <Login></Login>
    }
  }
})

```

:::

<script lang="ts" setup>
import { Login } from '../../src/index'

const onFinish = (v) => {console.log(v)}
</script>
