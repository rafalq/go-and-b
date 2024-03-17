package models

import "github.com/rafalq/golang-hotel-app/internal/forms"

// TemplateData holds data sent from handlers to templates
type TemplateData struct {
	StringMap map[string]string
	IntMap    map[string]int
	FloatMap  map[string]float32
	Data      map[string]interface{}
	CSRFToken string
	Success   string
	Warning   string
	Error     string
	Form      *forms.Form
}
