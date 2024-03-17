package forms

import (
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"
)

func TestForm_Valid(t *testing.T) {
	r := httptest.NewRequest("POST", "/whatever", nil)
	form := New(r.PostForm)

	isValid := form.Valid()
	if !isValid {
		t.Error("got invalid when should have been valid")
	}
}

func TestForm_Required(t *testing.T) {
	r := httptest.NewRequest("POST", "/whatever", nil)
	form := New(r.PostForm)

	form.Required("a", "b", "c")
	if form.Valid() {
		t.Error("form shows valid when required fields missing")
	}

	postedData := url.Values{}
	postedData.Add("a", "a")
	postedData.Add("b", "a")
	postedData.Add("c", "a")

	r, _ = http.NewRequest("POST", "/whatever", nil)

	r.PostForm = postedData
	form = New(r.PostForm)
	form.Required("a", "b", "c")
	if !form.Valid() {
		t.Error("shows does not have required fields when it does")
	}
}

func TestForm_Has(t *testing.T) {
	r := httptest.NewRequest("POST", "/whatever", nil)

	form := New(r.PostForm)
	has := form.Has("whatever")
	if has {
		t.Error("form shows has field when it does not")
	}

	postedData := url.Values{}
	postedData.Add("a", "a")
	form = New(postedData)
	has = form.Has("a")
	if !has {
		t.Error("shows form does not have field when it should")
	}
}

func TestForm_Range(t *testing.T) {
	r := httptest.NewRequest("POST", "/whatever", nil)
	form := New(r.PostForm)

	form.Range("x", 1, 20)
	if form.Valid() {
		t.Error("form shows range length for non-existent field")
	}

	isError := form.Errors.Get("x")
	if isError == "" {
		t.Error("should have an error, but did not get one")
	}

	postedData := url.Values{}

	postedData.Add("some_field", "some_value")
	form = New(postedData)
	form.Range("some_field", 11, 12)
	if form.Valid() {
		t.Error("shows range length from 11 when data is shorter")
	}

	postedData.Add("some_field", "some_value")
	form = New(postedData)
	form.Range("some_field", 1, 2)
	if form.Valid() {
		t.Error("shows range length to 2 when data is longer")
	}

	postedData = url.Values{}

	postedData.Add("another_field", "some_value")
	form = New(postedData)
	form.Range("another_field", 10, 20)
	if !form.Valid() {
		t.Error("shows range length from 1 to 2 what is not met when it is")
	}

	isError = form.Errors.Get("another_field")
	if isError != "" {
		t.Error("should not have an error, but got one")
	}
}

func TestForm_IsEmail(t *testing.T) {
	postedValues := url.Values{}
	form := New(postedValues)

	form.Email("x")
	if form.Valid() {
		t.Error("form shows valid email for non-existent field")
	}

	postedValues = url.Values{}
	postedValues.Add("email", "me@here.com")
	form = New(postedValues)

	form.Email("email")
	if !form.Valid() {
		t.Error("got an invalid email when we should not have")
	}

	postedValues = url.Values{}
	postedValues.Add("email", "x")
	form = New(postedValues)

	form.Email("email")

	if form.Valid() {
		t.Error("got valid for invalid email address")
	}
}

func TestForm_IsPhone(t *testing.T) {
	postedValues := url.Values{}
	form := New(postedValues)

	form.Phone("x")
	if !form.Valid() {
		t.Error("form shows valid phone for non-existent field")
	}

	postedValues = url.Values{}
	postedValues.Add("phone", "1_2-3 4")
	form = New(postedValues)

	form.Email("phone")
	if form.Valid() {
		t.Error("got a valid phone number when we should not have")
	}

	postedValues = url.Values{}
	postedValues.Add("phone", "hello*]")
	form = New(postedValues)

	form.Email("phone")

	if form.Valid() {
		t.Error("got valid for invalid phone number")
	}
}
