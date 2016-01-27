<%@ Page Title="" Language="VB" MasterPageFile="~/__parent.master" %>
<%@ MasterType virtualpath="~/__parent.master" %>

<script runat="server">
    Protected Sub Page_Load(sender As Object, e As System.EventArgs)
        Me.Master.SelectedPage = DontPanicFilms.PageOption.Store
    End Sub
</script>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<title><%= DontPanicFilms.Pages.Page.Store.Title%></title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentMain" Runat="Server">
    <%= DontPanicFilms.Pages.Page.Store.Content%>
</asp:Content>

