document.querySelectorAll('.delete-btn').forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', async () => {
        const id = deleteBtn.dataset.id
        const baseUrl = window.location.origin

        await fetch(`${baseUrl}/project/${id}`, {
            method: 'DELETE',
        })

        window.location.assign('/index')
    })
})
