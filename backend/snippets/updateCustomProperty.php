<?
/**
 * We can update:
 * 
 * - CustomField "description"
 * - title, slug of "post"
 * - status -> draft, publish,
 * - The ID is the "databaseId" somehow :D
 */
add_action('graphql_register_types', function(){
    register_graphql_mutation('updateCustomProperty', [
        'inputFields' => [
            'id' => [
                'type' => ['non_null' => 'String'],
                'description' => 'The ID of the "post"'
            ],
            'title' => [
                'type' => 'String',
                'description' => 'The title of the "post"'
            ],
			'slug' => [
                'type' => 'String',
                'description' => 'The sllug of the "post", used for URLs'
            ],
            'description' => [
                'type' => 'String',
                'description' => 'content field'
            ],
            'status' => [
                'type' => 'String',
                'description' => 'The status of the property (active, disabled)'
            ]
        ],
        'outputFields' => [
            'success' => [
                'type' => 'Boolean',
                'description' =>'Property submission successfull or not',
            ],
			'property' => [
				'type' => 'Property',
				'description' => 'The property created'
			],
			'description' => [
				'type' => 'String',
				'description' => 'The description created'
            ],
            'status' => [
                'type' => 'String',
                'description' => 'The status of the property (active, disabled)'
            ],
        ],
        'mutateAndGetPayload' => function($input, $context, $info){
            
            $post_id = $input['id'];         
			
			$current_post = get_post( $post_id);
			// TODO: check how we want to update title, slug, urls in the future
			// Nice post about updating slugs: https://wordpress.stackexchange.com/questions/217075/change-slug-on-post-creation/217101#217101
            if (isset($input['title'])) {
				$current_post->post_title = sanitize_text_field($input['title']);
            }
			
			 if (isset($input['slug'])) {
				$current_post->post_name = sanitize_text_field($input['slug']);
            }			
			
            if (isset($input['description'])) {
                update_field('description', $input['description'], $post_id);
				$current_post->post_content = sanitize_text_field($input['description']);
            }
			
            if (isset($input['status'])) {
				error_log("input['status']--> ".$input['status']);
				error_log($current_post->post_status);
                $current_post->post_status = $input['status'];				
            }
			wp_update_post($current_post);
            $current_post = get_post( $post_id);
            return [
				'success' => true,
				'property' => [
					'id' => $post_id,
					'title' => $title		
				],
				'description' => $input['description']//,
                'status' => $current_post->post_status
			];
        }
    ]);
});