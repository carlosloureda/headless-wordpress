<?php
add_action('graphql_register_types', function(){
    register_graphql_mutation('createCustomProperty', [
        'inputFields' => [
            'title' => [
                'type' => 'String',
                'description' => 'The title of the "post"'
            ],
            'description' => [
                'type' => 'String',
                'description' => 'content field'
            ],
            'galleryInput' => [
                'type' => ['list_of' => 'ID'],
                'description' => 'gallery field'
            ],
            'featuredImage' => [
                'type' => ['non_null' => 'Upload'],
            ],

        ],
        'outputFields' => [
            'propertySubmitted' => [
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
            'text' => [
                'type'    => 'String',
                'resolve' => function ($payload) {
                    return $payload['text'];
                },
            ],
        ],
        'mutateAndGetPayload' => function($input, $context, $info){
 			error_log("Hi we are inside");
            if (isset($input['featuredImage'])) {
                if (!function_exists('wp_handle_sideload')) {
                    require_once(ABSPATH . 'wp-admin/includes/file.php');
                }
    
                wp_handle_sideload($input['featuredImage'], [
                    'test_form' => false,
                    'test_type' => false,
                ]);
            }
  

			$title = uniqid('property-', false);
			if (isset($input['title'])) {
				$title = $input['title'];
			}
            $post_id = wp_insert_post([
                'post_type'=> 'property',
                'post_title' => $title,
                'post_content' => sanitize_text_field($input['description']),
                'post_status' => 'draft' // 'publish' , 'future'
            ]);
            update_field('description', $input['description'], $post_id);
						
			// $post = get_post($post_id);
			 error_log("Hi". $post->id);
			return [
				'propertySubmitted' => true,
				'property' => [
					'id' => $post_id,
					'title' => $title		
				],
				'description' => $input['description']	,
                'text' => 'Uploaded file was "' . $input['featuredImage']['name'] . '" (' . $input['featuredImage']['type'] . ').',
			];
        }
    ]);
});