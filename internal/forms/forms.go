package forms

import (
	"fmt"
	"net/url"
	"strings"

	"github.com/asaskevich/govalidator"
)

// Form creates a custom form struct , embeds a url.Values object
type Form struct {
	url.Values
	Errors errors
}

// New initialize a form struct
func New(data url.Values) *Form {
	return &Form{
		data,
		errors(map[string][]string{}),
	}
}

// Has checks if form field is in post and not empty
func (f *Form) Has(field string) bool {
	val := f.Get(field)
	return val != ""
}

// Required checks if form field is in post and not empty
func (f *Form) Required(fields ...string) {
	for _, field := range fields {
		val := f.Get(field)
		if strings.TrimSpace(val) == "" {
			f.Errors.Add(field, "Field cannot be blank")
		}
	}
}

// Range checks for string minimum and maximum length
func (f *Form) Range(field string, min int, max int) bool {
	val := f.Get(field)
	if len(val) < min || len(val) > max {
		f.Errors.Add(field, fmt.Sprintf("Enter value from %d to %d characters", min, max))
		return false
	}
	return true
}

// Valid returns true if there are no errors, otherwise - false
func (f *Form) Valid() bool {
	return len(f.Errors) == 0
}

// Email checks for valid email address
func (f *Form) Email(field string) {
	if !govalidator.IsEmail(f.Get(field)) {
		f.Errors.Add(field, "Invalid email address")
	}
}

func (f *Form) Phone(field string) {
	val := f.Get(field)
	val = strings.ReplaceAll(val, "-", "")
	val = strings.ReplaceAll(val, "_", "")
	val = strings.ReplaceAll(val, " ", "")

	if !govalidator.IsNumeric(val) {
		f.Errors.Add(field, "Only digits, \" - \", \" _ \" and empty spaces allowed")
	}
}
