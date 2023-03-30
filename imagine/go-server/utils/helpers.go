package utils

func BoolPointer(b bool) *bool {
	return &b
}

func ValidateNumber(val, minVal, maxVal int) int {
	if val < minVal || val > maxVal {
		val = maxVal
	}
	return val
}
