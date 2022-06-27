import Vue from 'vue'

function setProp (obj, props, value) {
	const prop = props.shift()
	if (!obj[prop]) {
		if (!isNaN(props[0])) {
			Vue.set(obj, prop, [])
		} else {
			Vue.set(obj, prop, {})
		}
	}
	if (!props.length) {
		if (value && typeof value === 'object' && !Array.isArray(value)) {
			if (obj.length !== undefined) {
				obj.splice(prop, 1, value)
			} else {
				obj[prop] = { ...obj[prop], ...value }
			}
		} else {
			obj[prop] = value
		}
		return
	}
	setProp(obj[prop], props, value)
}

function getProp (obj, props) {
  const prop = props.shift()
  if (!obj[prop] || !props.length) {
    return obj[prop]
  }
  return getProp(obj[prop], props)
}

function deleteProp (obj, props) {
  const prop = props.shift()
  if (!obj[prop]) {
    return
  }
  if (!props.length) {
    Vue.delete(obj, prop)
    return
  }
  deleteProp(obj[prop], props)
}

export {setProp, getProp, deleteProp}